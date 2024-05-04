pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'wonyus/linked'
        DOCKER_REGISTRY_CREDENTIALS = 'docker-credential'
        DOCKER_REGISTRY_URL = 'https://registry.hub.docker.com' // Update with your registry URL
        DOCKER_REGISTRY_USERNAME = credentials('YOUR_REGISTRY_USERNAME_ID') // Update with your registry username credential ID
        DOCKER_REGISTRY_PASSWORD = credentials('YOUR_REGISTRY_PASSWORD_ID') // Update with your registry password credential ID
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
                    withDockerRegistry(url: DOCKER_REGISTRY_URL, credentialsId: 'YOUR_REGISTRY_CREDENTIALS_ID') {
                        pushDockerImage("${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}")
                        pushDockerImage("${DOCKER_IMAGE_NAME}:latest")
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
