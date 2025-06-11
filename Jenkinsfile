pipeline {
  agent any
  
  stages {
    stage('deploy asso docker images!') {
      when {
        branch "deployment"
      }
      steps {
      echo 'building ...'
        sh 'docker build -t asso/frontend .'
      }
    }

    stage('push asso docker image to ECR!') {
      when {
        branch "deployment"
      }
      steps {
        echo 'loging in...'
        sh 'aws ecr get-login-password | docker login --username AWS --password-stdin 190084704684.dkr.ecr.eu-west-3.amazonaws.com'
        echo 'tagging ...'
        sh 'docker tag asso/frontend:latest 190084704684.dkr.ecr.eu-west-3.amazonaws.com/asso/frontend:latest'
        echo 'pushing ...'
        sh 'docker push 190084704684.dkr.ecr.eu-west-3.amazonaws.com/asso/frontend:latest'
      }
    }
    
    stage('deploy the asso project on the server!') {
      when {
        branch "deployment"
      }
      steps {
        echo "copy compose file to the server..."
        sh "scp compose.yml ubuntu@13.36.159.10:asso/"
        echo 'Deploying mavie...'
        sh 'ssh ubuntu@13.36.159.10 "bash -lc \\"./awslogin.sh && docker compose -f asso/compose.yml pull && docker compose -f asso/compose.yml --project-name asso up -d\\""'
        echo "asso deployed!"
      }
    }
  }
}