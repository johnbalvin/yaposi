# Easiest usage
  1. Install [docker desktop](https://www.docker.com/products/docker-desktop)
  2. Run in console:  `docker pull  gcr.io/yaposi/backend`
  3. Run in console:  `docker run -p 3001:3001 gcr.io/yaposi/backend`
  4. Made a post request at [http://localhost:3001](http://localhost:3001), the body most be a json of this format:
  "markdown":[mymarkdown] where [mymarkdown] most be your markdown
  5. If something went wrong you will recieve and 400 status
  5. Otherwise you will get 200 status with body containing the rendered markdown
  
# Easy usage

 1. Install [nodejs](https://nodejs.org/es)
 2. Run in console: `cd backend/deploy`
 3. Run in console: `npm install`
 4. Run in console : `node server.js`
 5. Made a post request at [http://localhost:3001](http://localhost:3001), the body most be a json of this format:
  "markdown":[mymarkdown] where [mymarkdown] most be your markdown
 6. If something went wrong you will recieve and 400 status
 7. Otherwise you will get 200 status with body containing the rendered markdown
  
## Hosting your image

If you want to host your image like gcr.io/yaposi/backend, you could use [Google Cloud build](https://cloud.google.com/cloud-build/) follow next steps:
   
### Requirements
  * You need the content inside folder `deploy`
  * Create a proyect at [Google Console](https://console.cloud.google.com) and enable billing
  * Install [Google SDK](https://cloud.google.com/sdk/) and authenticate with your account
  * Change at `deploy/cloudbuild.yaml` this: `gcr.io/yaposi/backend` for this format: `gcr.io/[projectID]/anyNameYouWant` for your reporsitory created
  
### Steps  
  1. In the console go to *deploy* folder : `cd backend/deploy`
  2. Run in console: `gcloud builds submit .`
  3. Your should now have `gcr.io` repository