pipeline {
    agent any

    environment {
        sonarQubeScanner = tool name: 'SonarQubeScanner'
        username = "himanshusb12"
        dockerPort = 7400
        appPort = 7400
    }

    tools {
        nodejs "node"
    }

    options {
        timestamps()

        timeout(time: 1, unit: "HOURS")

        skipDefaultCheckout()

        buildDiscarder(logRotator(
            numToKeepStr: '5',
            daysToKeepStr: '10'
        ))
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Build") {
            steps {
                bat "npm install ."
            }
        }

        stage("Run tests") {
            steps {
                bat "npm test"
            }
        }

        stage("SonarQube Analysis") {
            steps {
                withSonarQubeEnv("Devops_Sonar") {
                    bat "${sonarQubeScanner}/bin/sonar-scanner -Dsonar.projectKey=devops-demo-app -Dsonar.projectName=devops-demo-app -Dsonar.langauage=js -Dsonar.sourceEncoding=UTF-8 -Dsonar.exclusions=tests/** -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                }
            }
        }

        stage("Quality Gate") {
            steps {
                bat "echo Quality check"
            }
        }

        stage("Build docker image") {
            steps {
                bat "docker build -t i_${username}_app:${BUILD_NUMBER} ."
            }
        }

        stage("Push docker image") {
            steps {
                bat "docker tag i_${username}_app:${BUILD_NUMBER} ${username}/devops-demo-app:${BUILD_NUMBER}"
                bat "docker tag i_${username}_app:${BUILD_NUMBER} ${username}/devops-demo-app:latest"

                withDockerRegistry([credentialsId: "DockerHub", url: ""]) {
                    bat "docker push ${username}/devops-demo-app:${BUILD_NUMBER}"
                    bat "docker push ${username}/devops-demo-app:latest"
                }
            }
        }

        stage("Deployment") {
            parallel {
                stage("Docker deployment") {
                    script {
                        if (bat(script: "docker port c_${username}_app", returnStatus: true) == 0) {
                            bat "docker rm -f c_${username}_app"
                        }
                    }
                    steps {
                        bat "docker run --name c_${username}_app -p ${appPort}:${dockerPort} -d ${username}/devops-demo-app:latest"
                    }
                }

                stage("Kubernetes deployment") {
                    steps {
                        bat "echo K8s deployment"
                    }
                }

            }
        }   
    }
}