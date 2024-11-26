pipeline {
    agent any

    environment {
        FRONTEND_IP = {env.FRONTEND_IP}
        BACKEND_IP = {env.BACKEND_IP}
        SSH_CREDENTIALS_ID = {env.SSH_CREDENTIALS_ID} // Reference Global Credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/skkumar97260/portfolio.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('panel') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'tar -czf build.tar.gz build'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS_ID]) {
                    sh """
                    scp frontend/build.tar.gz ec2-user@${env.FRONTEND_IP}:/home/ec2-user/
                    ssh ec2-user@${env.FRONTEND_IP} 'sudo tar -xzf /home/ec2-user/build.tar.gz -C /var/www/html'
                    """
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS_ID]) {
                    sh """
                    scp -r backend ec2-user@${env.BACKEND_IP}:/home/ec2-user/
                    ssh ec2-user@${env.BACKEND_IP} 'cd /home/ec2-user/backend && pm2 start server.js --name backend'
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
    }
}
