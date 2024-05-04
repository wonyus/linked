pipeline {
    agent any
    tools {
        DockerTool 'default'
    }
    environment {
        DOCKER_CERT_PATH = credentials('id-for-a-docker-cred')
    }
    stages {
        stage('foo') {
            steps {
                sh 'docker version' // DOCKER_CERT_PATH is automatically picked up by the Docker client
            }
        }
    }
}
