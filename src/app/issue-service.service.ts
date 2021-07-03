import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
//import { Console } from 'console';
const API_URL = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root'
})
export class IssueServiceService {

  constructor(private http:HttpClient) {}

  getMyIssueList(){
   
    var headerObject = {
      "Content-Type":"application/json",
      
    }
    const headers = new HttpHeaders(headerObject);    
   //console.log(headerObject);
   //console.log(requestObject);
   return this.http.get(API_URL+'Issue',{headers:headers});

  }

  submitIssue(requestData:any){
   
    var headerObject = {
      "Content-Type":"application/json",
      
    }
    const headers = new HttpHeaders(headerObject);    
   //console.log(headerObject);
   //console.log(requestObject);
   return this.http.post(API_URL+'Issue',requestData, {headers:headers});

  }

  deleteIssue(id:any){
    var headerObject = {
      "Content-Type":"application/json",
      
    }
    const headers = new HttpHeaders(headerObject);    
   //console.log(headerObject);
   //console.log(requestObject);
   return this.http.delete(API_URL+'Issue/'+id, {headers:headers});
  }

  getIssueById(id:any){
    var headerObject = {
      "Content-Type":"application/json",
      
    }
    const headers = new HttpHeaders(headerObject);    
   //console.log(headerObject);
   //console.log(requestObject);
   return this.http.get(API_URL+'Issue/'+id, {headers:headers});
  }

  putIssueById(requestData:any){
    var id = requestData.id
    var headerObject = {
      "Content-Type":"application/json",
      
    }
    const headers = new HttpHeaders(headerObject);    
   //console.log(headerObject);
   //console.log(requestObject);
   return this.http.put(API_URL+'Issue/'+id, requestData, {headers:headers});
  }

}
