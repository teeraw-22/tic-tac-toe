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
        stage('Deploy to Production') {
            steps {
                // PM2 start app
                sh '''
                    pm2 describe tic-tac-toe-app > /dev/null
                    if [ $? -eq 0 ]; then
                        pm2 reload tic-tac-toe-app --update-env
                    else
                        pm2 start ecosystem.config.js
                    fi
                '''
            }
        }
    }
    post {
        success {
            echo 'Pipeline passed & deployed successfully with PM2!'
        }
        failure {
            echo 'Pipeline failed. Deployment aborted.'
        }
    }
}

