package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

var markdown = `# hello world 🥚x = {-b \pm \sqrt{b^2-4ac} \over 2a}🐤`

var urlYaposi = "http://localhost:3001"

func main() {
	//by raw html
	html, err := getMeFromURL(markdown)
	if err != nil {
		log.Println("main:1 -> err:", err)
		return
	}
	fmt.Printf("html: %s", html)
	//----------------------------------
	//by fetching it over HTTP
	resp, err := http.Get("https://storage.googleapis.com/yaposi/README.md")
	if err != nil {
		log.Println("main:2 -> err:", err)
		return
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("main:3 -> err:", err)
		return
	}
	markdown = string(body)
	html, err = getMeFromURL(markdown)
	if err != nil {
		log.Println("main:4 -> err:", err)
		return
	}
	fmt.Printf("\n\nhtml: \n%s", html)
	//-------------------------
}
func getMeFromURL(markdown string) (string, error) {
	data := yaposiOptions{Markdown: string(markdown)}
	jsonValue, err := json.Marshal(data)
	if err != nil {
		log.Println("getMeFromURL:1 -> err:", err)
		return "", err
	}
	resp, err := http.Post(urlYaposi, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		log.Println("getMeFromURL:2 -> err:", err) //this error may be because you haven't run the docker image
		return "", err
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("getMeFromURL:3 -> err:", err)
		return "", err
	}
	if resp.StatusCode == 400 {
		log.Printf("getMeFromURL:4 %s\n", body)
		return "", errors.New("err: " + string(body))
	}
	return string(body), nil
}
