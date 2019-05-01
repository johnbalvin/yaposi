# Frontend 
### Online Example
* [normal](https://storage.googleapis.com/yaposi/example/fetching/normal/index.html)

* [module](https://storage.googleapis.com/yaposi/example/fetching/module/index.html)

* [if Already Rendered](https://storage.googleapis.com/yaposi/example/ifAlreadyRendered/index.html)

# Backend
  1. Install [docker desktop](https://www.docker.com/products/docker-desktop)
  2. Run in console:  `docker pull  gcr.io/yaposi/backend`
  3. Run in console:  `docker run -p 3001:3001 gcr.io/yaposi/backend`
  4. Made a post request at [http://localhost:3001](http://localhost:3001), the body most be a json of this format:
  "markdown":[mymarkdown] where [mymarkdown] most be your markdown
  5. If something went wrong you will recieve and 400 status
  5. Otherwise you will get 200 status with body containing the rendered markdown
  