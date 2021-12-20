import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../service/vendor.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Vend } from '../../Module/Vendor'
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  Vend: Vend[] | undefined;
  VendSingle: Vend[] | undefined;
  headers = ["ID", 'Name', 'Email', 'Phone Number', 'GST', 'Address', 'City', 'State', 'Pincode', 'Actions'];

  Vname: string = '';
  Vemail: string = '';
  Vphone: string = '';
  Vgst: string = '';
  Vaddress: string = '';
  Vcity: string = '';
  Vstate: string = '';
  Vpin_code: string = '';

  loading: boolean = false;
  errorMessage: any;
  closeResult: string | undefined;
  VendorToUpdate = {
    name: '',
    email: '',
    phone: '',
    gst: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    address_id: '',
  };

  constructor(
    private VendorService: VendorService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getVendors();
  }
  open(content: any){
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public getVendors() {
    this.loading = true;
    this.errorMessage = '';
    this.VendorService.getVendor().subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.Vend = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.error('Request completed'); //This is actually not needed
        this.loading = false;
      }
    );
  }
  public addvendor() {
    this.loading = true;
    this.errorMessage = '';
    this.VendorService.postUserData(
      this.Vname,
      this.Vemail,
      this.Vphone,
      this.Vgst,
      this.Vaddress,
      this.Vcity,
      this.Vstate,
      this.Vpin_code
    ).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
        //this.user = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.log('Request completed'); //This is actually not needed
        this.loading = false;
        this.getVendors();
      }
    );
  }
  public putvendor(vid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.VendorService.putUserData(
      vid,
      this.VendorToUpdate.name,
      this.VendorToUpdate.email,
      this.VendorToUpdate.phone,
      this.VendorToUpdate.gst,
      this.VendorToUpdate.address,
      this.VendorToUpdate.city,
      this.VendorToUpdate.state,
      this.VendorToUpdate.pin_code,
      this.VendorToUpdate.address_id
    ).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
        // console.log(
        //   eid,
        //   this.CustomerToUpdate.name,
        //   this.CustomerToUpdate.gst,
        //   this.CustomerToUpdate.email,
        //   this.CustomerToUpdate.phone,
        //   this.CustomerToUpdate.address,
        //   this.CustomerToUpdate.city,
        //   this.CustomerToUpdate.state,
        //   this.CustomerToUpdate.pin_code
        // );
        // this.user = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        console.log(vid);
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.log('Request completed'); //This is actually not needed
        this.loading = false;
      }
    );
  }
  public deleteUser(Vuid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.VendorService.deleteUserData(Vuid).subscribe(
      (response) => {
        //next() callback
        console.log('response send');
        //this.user = response['data'];
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.log('Request completed'); //This is actually not needed
        //this.loading = false;
        this.getVendors();
      }
    );
  }
  public getSingleVendor(Vid: any) {
    this.loading = true;
    this.errorMessage = '';
    this.VendorService.getSingleVendor(Vid).subscribe(
      (response) => {
        //next() callback
        console.log('response received');
        this.VendSingle = response['data'];
        console.log(response);
      },
      (error) => {
        //error() callback
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        //complete() callback
        console.log('Request completed'); //This is actually not needed
        this.loading = false;
      }
    );
  }
  update(vendor: any) {
    this.VendorToUpdate = vendor;
  }

}
