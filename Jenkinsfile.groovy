pipeline {
    def app

    agent any

    tools {
        dockerTool 'Docker'
    }

    environment {
        DOCKER_IMAGE_NAME = 'wonyus/linked'
        DOCKER_REGISTRY_CREDENTIALS = 'docker-credential'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            app = docker.build("${DOCKER_IMAGE_NAME}")
        }

        stage('Push Docker Image') {
            docker.withRegistry('https://registry.hub.docker.com', "${DOCKER_REGISTRY_CREDENTIALS}") {
                app.push("${env.BUILD_NUMBER}")
                app.push('latest')
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here
                // For example:
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
