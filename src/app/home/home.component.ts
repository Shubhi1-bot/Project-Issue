import { Component, OnInit } from '@angular/core';
import {IssueServiceService } from '../issue-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// addingIssueForm :  FormControl;
issueList:any;
currIssue:any;
 closeResult = '';
 id = new FormControl(null);
 projectName = new FormControl('');
 title = new FormControl('');
 description = new FormControl('');
 priority = new FormControl('');
 created_Date = new FormControl('');
 updated_Date = new FormControl('');
 //  closeResult: string;
  // constructor(private issueService:IssueServiceService, private modalService: NgbModal) { }
  constructor(

    private issueService:IssueServiceService, 
    private modalService: NgbModal) {

  }  


  ngOnInit(): void {
    this.getAllIssue();

  }
  getAllIssue() {
 this.issueService.getMyIssueList().subscribe((resp:any)=>{
  var respVal;
  respVal = resp.data;
  this.issueList = respVal;
  console.log(this.issueList);
  return
} )
  }

  open(content:any) {
    
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    this.projectName.setValue('');
    this.title.setValue('');
    this.description.setValue('');
    this.priority.setValue('');
    this.created_Date.setValue('');
    this.updated_Date.setValue('');
    this.id.setValue(null);

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(){
   if(this.projectName.invalid || this.title.invalid || this.description.invalid || this.priority.invalid){
     alert("All fields are required!!");
     return
   }
   var issueData = {
     "projectName" : this.projectName.value,
     "title": this.title.value,
     "description": this.description.value,
     "priority": this.priority.value
   }
  //  console.log(issueData);
  //  console.log(this.priority)
  //  return
  this.issueService.submitIssue(issueData).subscribe((resp:any)=>{
    var respVal;
    respVal = resp;
    if(respVal.success == true ){
      this.modalService.dismissAll();
    alert(respVal.data);
    this.projectName.setValue('');
    this.title.setValue('');
    this.description.setValue('');
    this.priority.setValue('');
    this.created_Date.setValue('');
    this.updated_Date.setValue('');
    this.id.setValue(null);
    this.getAllIssue();
    return
    }
      })
    }



deleteIssue(issue:any){
var id = issue._id;
var r = confirm("Do you want delete!");
if (r == true) {
  this.issueService.deleteIssue(id).subscribe((resp:any)=>{
    var respVal;
    respVal = resp;
    if(respVal.success == true ){
    alert(respVal.data)
    this.getAllIssue();
    return
    }
      })
}

    }

displaypop(issue:any, displayIssue:any){
  var id = issue._id;
  console.log(this.currIssue)

  this.issueService.getIssueById(id).subscribe((resp:any)=>{
  var respVal;
  respVal = resp.data;
this.currIssue = respVal[0];
// console.log(this.currIssue)
this.open(displayIssue);
return
  })


    }

editIssue(issue:any, content:any){
  this.projectName.setValue(issue.projectName);
  this.title.setValue(issue.title);
  this.description.setValue(issue.description);
  this.priority.setValue(issue.priority);
  this.created_Date.setValue(issue.created_Date);
  this.id.setValue(issue._id);
  this.open(content);
  return
}
  
savedata(){
  if(this.projectName.invalid || this.title.invalid || this.description.invalid || this.priority.invalid){
    alert("All fields are required!!");
    return
  }
console.log(typeof this.id.value)
  if(typeof this.id.value != 'object' || this.id.value != null){
    console.log("edit")
    var issueData = {
      "projectName" : this.projectName.value,
      "title": this.title.value,
      "description": this.description.value,
      "priority": this.priority.value,
     "created_Date": this.created_Date.value,
      "id": this.id.value
    }
    this.editData(issueData);
   
  }else{
    console.log("new")
    this.onSubmit();
  } 

}

editData(issueData:any){
  
  this.issueService.putIssueById(issueData).subscribe((resp:any)=>{
    var respVal;
    respVal = resp;
    if(respVal.success == true ){
      this.modalService.dismissAll();
    alert(respVal.data);
    this.projectName.setValue('');
    this.title.setValue('');
    this.description.setValue('');
    this.priority.setValue('');
    this.created_Date.setValue('');
    this.updated_Date.setValue('');
    this.id.setValue(null);
    this.getAllIssue();
    return
    }
    })
  }
  
  
}
