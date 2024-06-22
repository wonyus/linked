/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent { label 'NODE_BATCH' }

    environment {
        DOCKER_IMAGE_NAME = 'wonyus/linked'
        DOCKER_REGISTRY_CREDENTIALS = 'docker-hub-wonyus'
        DOCKER_REGISTRY_URL = 'https://registry.hub.docker.com'
        GIT_CREDENTIALS = 'github-wonyus'
        GIT_REPO_URL = 'git@github.com:wonyus/ci.git'
        DEPLOYMENT_FILE = '.kube/deployment.yaml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Checkout env') {
            steps {
                /* groovylint-disable-next-line LineLength */
                checkout changelog: false, poll: false, scm: scmGit(branches: [[name: '*/main']], extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'temp']], userRemoteConfigs: [[credentialsId: "${GIT_CREDENTIALS}", url: "${GIT_REPO_URL}"]])
            }
        }

        stage('Move Checkout env') {
            steps {
                sh 'cp temp/linked/.env .env'
                sh 'rm -rf temp'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    buildDockerImage("${env.GIT_COMMIT}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    withDockerRegistry(url: "${DOCKER_REGISTRY_URL}", credentialsId: "${DOCKER_REGISTRY_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE_NAME}:${env.GIT_COMMIT}").push()
                        docker.image("${DOCKER_IMAGE_NAME}:latest").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'kubectl delete deployment linked -n linked'
                sh "kubectl apply -f ${DEPLOYMENT_FILE}"
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}

/* groovylint-disable-next-line FactoryMethodName, MethodParameterTypeRequired, MethodReturnTypeRequired, NoDef */
def buildDockerImage(tag) {
    sh "docker build -t ${DOCKER_IMAGE_NAME}:${tag} -t ${DOCKER_IMAGE_NAME}:latest ."
}
