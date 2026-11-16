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
        stage('Smoke Test App') {
            steps {
                // Run server
                sh '''
                    nohup npm start > app.log 2>&1 &
                    sleep 3
                    curl -I http://localhost:3000/health
                    pkill -f "node server.js"
                '''
            }
        }
    }
    post {
        success {
            echo 'Pipeline passed successfully without Docker!'
        }
    }
}

