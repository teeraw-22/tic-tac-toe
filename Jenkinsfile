pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling source code from Git...'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build & Deploy') {
            steps {
                sh '''
                    # 1. Build Docker image from Dockerfile
                    docker build -t tic-tac-toe-app .

                    # 2. Stop and remove existing container if it exists to avoid port conflicts
                    docker rm -f tic-tac-toe-container || true

                    # 3. Run the new container in background mode, mapping port 3000
                    docker run -d --name tic-tac-toe-container -p 3000:3000 tic-tac-toe-app
                '''
            }
        }
	stage('Smoke Test') {
            steps {
                sh '''
                    # Wait 3 seconds for container app to boot up
                    sleep 3
                    
                    # Check HTTP status code (must return 200 OK)
                    curl -f http://localhost:3000 || exit 1
                    echo "Smoke test passed! Application is up and responding."
                '''
            }
        }
    }
    post {
        success {
            echo 'Pipeline passed & deployed successfully with Docker!'
        }
        failure {
            echo 'Pipeline failed. Deployment aborted.'
        }
    }
}

