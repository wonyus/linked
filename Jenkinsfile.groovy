pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'wonyus/linked'
        DOCKER_REGISTRY_CREDENTIALS = 'docker-credential'
        DOCKER_REGISTRY_URL = 'https://registry.hub.docker.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    buildDockerImage("${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(url: "${DOCKER_REGISTRY_URL}", credentialsId: "${DOCKER_REGISTRY_CREDENTIALS}") {
                        pushDockerImage("${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}")
                        pushDockerImage("${DOCKER_IMAGE_NAME}:latest")

                        sh "docker logout ${DOCKER_REGISTRY_URL}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here
                sh 'pwd'
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

def buildDockerImage(tag) {
    sh "docker build -t ${tag} ."
}

def pushDockerImage(tag) {
    sh "docker push ${tag}"
}
