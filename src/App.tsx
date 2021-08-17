/*eslint-disable*/
import { IonApp, IonButton, IonContent, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
// import { PdfViewer } from 'capacitor-pdf-viewer-plugin';
//13.6
import { Plugins,FilesystemDirectory, Filesystem } from '@capacitor/core';

// import FileSaver from 'file-saver';
//import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
//import { FilesystemPluginWeb } from '@capacitor/core/dist/esm/web/filesystem.js';

// You must import the module directly, rather than using 'Plugins.BlobWriter'.
import { writeFile } from "capacitor-blob-writer";
import { Http } from '@capacitor-community/http';
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";

//const base64 = 'data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg=='
//const base64 ='JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg=='
import {BASE64} from './file';
// const { Filesystem } = Plugins;
//const Filesystem = new FilesystemPluginWeb();
const App: React.FC = () => {

  const { Browser } = Plugins;
  //let blob ;

  // const downloadPdf =(pdfBase64: string) =>{
  //   const { Filesystem } = Plugins;

  //   if (this.plt.is('cordova')) {
  //       // Save the PDF to the device
  //       const fileName = 'timesheet.pdf';
  //       try {
  //         Filesystem.writeFile({
  //           path: fileName,
  //           data: pdfBase64,
  //           directory: FilesystemDirectory.Documents
  //           // encoding: FilesystemEncoding.UTF8
  //         }).then((writeFileResult) => {
  //           Filesystem.getUri({
  //               directory: FilesystemDirectory.Documents,
  //               path: fileName
  //           }).then((getUriResult) => {
  //               const path = getUriResult.uri;
  //               this.fileOpener.open(path, 'application/pdf')
  //               .then(() => console.log('File is opened'))
  //               .catch(error => console.log('Error openening file', error));
  //           }, (error) => {
  //               console.log(error);
  //           });
  //         });
  //       } catch (error) {
  //         console.error('Unable to write file', error);
  //       }
  //     } else {
  //     // On a browser simply use download
  //     this.pdfObj.download();
  //   }
  // }
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'application/pdf' });
    return blob;
  }

  // const showFromUrl = () => {
  //   const url = "http://www.africau.edu/images/default/sample.pdf";
  //   const { PdfViewer } = Plugins;
  //   PdfViewer.show({ url: url })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  // const pickAndShow = () => {
  //   const { PdfViewer } = Plugins;
  //   PdfViewer.pickAndShow()
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  // const writeSecretFile = async () => {
  //   await Filesystem.writeFile({
  //     path: 'secrets/text.txt',
  //     data: "This is a test",
  //     directory: Directory.Documents,
  //     encoding: Encoding.UTF8,
  //   });
  // };

  const richa = (blob) =>{
    return new Promise((resolve,reject)=>{
      const reader =new FileReader;
      reader.onerror=reject;
      reader.onload = () =>{
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    })
  }

  const downloadFile = async () => {
    console.log('downloadFile');
    try {
      const options = {
        url: 'http://localhost:8090/',
        // Optional
        method: 'GET',
        // filePath: 'stupid.pdf',
        // fileDirectory: FilesystemDirectory.Cache,
      };

      // Writes to local filesystem
    //   const response = await Http.request(options);
    // // //   //const blobURL = URL.createObjectURL(response);
    // // //   // const res = response.data;
      
    //   const blob = new Blob([response.data], { type: "application/pdf" });
      
    //   let base64 = await richa(blob);
    //   console.log('response',blob,base64);
      

      // const {uri} =await Filesystem.writeFile({
      //   data: response.data,
      //   path: "richa_richa.pdf",
      //   directory: FilesystemDirectory.Documents,
      // });
      // console.log('uri','file:/'+uri);
      // const uri = await Filesystem.getUri({
      //   directory:FilesystemDirectory.Data,
      //   path: "richa_richa.pdf",
      
      // });
      // const path = Capacitor.convertFileSrc(uri.uri);
      //console.log('path',uri);
    //      const {uri} = await Filesystem.writeFile({
    //   path: "media/pdf/res.pdf",
    //   data: blob,
    //   directory: FilesystemDirectory.Documents,
    //   //encoding: FilesystemEncoding.UTF8,
    // });
    //     window['PreviewAnyFile'].previewPath(
    //     win =>
    //         {
    //             if (win == "SUCCESS") {
    //                 console.log('success')
    //             } else if (win == "CLOSING") {
    //                 console.log('closing');
    //                 //base64 =null;
    //             } else if (win == "NO_APP") {
    //                 console.log('no suitable app to open the file (mainly will appear on android')
    //             } else {
    //                 console.log('error')
    //             }
    //         },
    //     error => {
    //       console.error("open failed", error);
    //       // base64=null;
      
    //   },
    //   'file:/'+uri,
    // );
   
    } catch (e) {
      console.error(e);
    }

    

    // Then read the file
    // if (response.path) {
    //   const read = await Filesystem.readFile({
    //     path: 'download.pdf',
    //     directory: FilesystemDirectory.Data,
    //   });
    // }
  };

  const downloadVideo = async () => {
    //downloadFile();
    // Firstly, obtain a Blob.
    const byteArray =[37, 80, 68, 70, 45, 49, 46, 49, 10, 37, -62, -91, -62, -79, -61,
      -85, 10, 10, 49, 32, 48, 32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 47, 84, 121, 112, 101, 32, 47, 67, 97, 116,
      97, 108, 111, 103, 10, 32, 32, 32, 32, 32, 47, 80, 97, 103, 101, 115, 32, 50, 32, 48, 32, 82, 10, 32, 32, 62,
      62, 10, 101, 110, 100, 111, 98, 106, 10, 10, 50, 32, 48, 32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 47, 84, 121,
      112, 101, 32, 47, 80, 97, 103, 101, 115, 10, 32, 32, 32, 32, 32, 47, 75, 105, 100, 115, 32, 91, 51, 32, 48, 32,
      82, 93, 10, 32, 32, 32, 32, 32, 47, 67, 111, 117, 110, 116, 32, 49, 10, 32, 32, 32, 32, 32, 47, 77, 101, 100,
      105, 97, 66, 111, 120, 32, 91, 48, 32, 48, 32, 51, 48, 48, 32, 49, 52, 52, 93, 10, 32, 32, 62, 62, 10, 101,
      110, 100, 111, 98, 106, 10, 10, 51, 32, 48, 32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 32, 47, 84, 121, 112,
      101, 32, 47, 80, 97, 103, 101, 10, 32, 32, 32, 32, 32, 32, 47, 80, 97, 114, 101, 110, 116, 32, 50, 32, 48, 32,
      82, 10, 32, 32, 32, 32, 32, 32, 47, 82, 101, 115, 111, 117, 114, 99, 101, 115, 10, 32, 32, 32, 32, 32, 32, 32,
      60, 60, 32, 47, 70, 111, 110, 116, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 60, 60, 32, 47, 70, 49, 10,
      32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 60, 60, 32, 47, 84, 121, 112, 101, 32, 47, 70, 111,
      110, 116, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 47, 83, 117, 98, 116,
      121, 112, 101, 32, 47, 84, 121, 112, 101, 49, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
      32, 32, 32, 47, 66, 97, 115, 101, 70, 111, 110, 116, 32, 47, 84, 105, 109, 101, 115, 45, 82, 111, 109, 97, 110,
      10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 62, 62, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32,
      32, 32, 62, 62, 10, 32, 32, 32, 32, 32, 32, 32, 62, 62, 10, 32, 32, 32, 32, 32, 32, 47, 67, 111, 110, 116, 101,
      110, 116, 115, 32, 52, 32, 48, 32, 82, 10, 32, 32, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 10, 52, 32, 48,
      32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 47, 76, 101, 110, 103, 116, 104, 32, 53, 53, 32, 62, 62, 10, 115,
      116, 114, 101, 97, 109, 10, 32, 32, 66, 84, 10, 32, 32, 32, 32, 47, 70, 49, 32, 49, 56, 32, 84, 102, 10, 32,
      32, 32, 32, 48, 32, 48, 32, 84, 100, 10, 32, 32, 32, 32, 40, 72, 101, 108, 108, 111, 32, 87, 111, 114, 108,
      100, 41, 32, 84, 106, 10, 32, 32, 69, 84, 10, 101, 110, 100, 115, 116, 114, 101, 97, 109, 10, 101, 110, 100,
      111, 98, 106, 10, 10, 120, 114, 101, 102, 10, 48, 32, 53, 10, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 32, 54,
      53, 53, 51, 53, 32, 102, 32, 10, 48, 48, 48, 48, 48, 48, 48, 48, 49, 56, 32, 48, 48, 48, 48, 48, 32, 110, 32,
      10, 48, 48, 48, 48, 48, 48, 48, 48, 55, 55, 32, 48, 48, 48, 48, 48, 32, 110, 32, 10, 48, 48, 48, 48, 48, 48,
      48, 49, 55, 56, 32, 48, 48, 48, 48, 48, 32, 110, 32, 10, 48, 48, 48, 48, 48, 48, 48, 52, 53, 55, 32, 48, 48,
      48, 48, 48, 32, 110, 32, 10, 116, 114, 97, 105, 108, 101, 114, 10, 32, 32, 60, 60, 32, 32, 47, 82, 111, 111,
      116, 32, 49, 32, 48, 32, 82, 10, 32, 32, 32, 32, 32, 32, 47, 83, 105, 122, 101, 32, 53, 10, 32, 32, 62, 62, 10,
      115, 116, 97, 114, 116, 120, 114, 101, 102, 10, 53, 54, 53, 10, 37, 37, 69, 79, 70, 10 ];
    try{
      const blobFromByteArray = new Blob([new Uint8Array(byteArray)], { type: 'application/pdf' });
      const objectURL = URL.createObjectURL(blobFromByteArray);
      console.log('blobFromByteArray objectURL',blobFromByteArray,objectURL);
      //downloadFile();
    // const res = await fetch("http://localhost:8090/");
    // //const blob = await res.blob();
    //   const options = {
    //     url: 'http://localhost:8090/',
    //     // Optional
    //     method: 'GET',
    //   };

    // //   // Writes to local filesystem
    // const response = await Http.request(options);
    //console.log('File written to ',File.dataDirectory+'pleasepleasework.pdf');
    //console.log('Response data',response.data);
    const downloadFile = async () => {
      console.log("CALLLIIIINGGG")
      const options = {
        url:'http://localhost:8090/',
        filePath: 'document.pdf',
        fileDirectory: FilesystemDirectory.Documents,
        // Optional
        method: 'GET',
      };
      
      const response = await Http.downloadFile(options);
      window['PreviewAnyFile'].previewPath(
        win =>
            {
                if (win == "SUCCESS") {
                    console.log('success')
                } else if (win == "CLOSING") {
                    console.log('closing')
                } else if (win == "NO_APP") {
                    console.log('no suitable app to open the file (mainly will appear on android')
                } else {
                    console.log('error')
                }
            },
        error => console.error("open failed", error),
        FilesystemDirectory.Documents+'document.pdf',
  );
      console.log('FilesystemDirectory.Documents',response,FilesystemDirectory.Documents);

  // Then read the file
  //   if (response.path) {
  //   const read = await Filesystem.readFile({
  //     path: 'download.pdf',
  //     directory: FilesystemDirectory.Documents,
  //   });
  // }
    };
    
    //downloadFile();
    
    const filepath = await  File.writeFile(
      File.dataDirectory,
      'byteArray.pdf',
      blobFromByteArray,
      //new Blob([response.data]),
      {
        replace: true,
      }
    );
    console.log('filepath',filepath);
    window['PreviewAnyFile'].previewPath(
          win =>
              {
                  if (win == "SUCCESS") {
                      console.log('success')
                  } else if (win == "CLOSING") {
                      console.log('closing')
                  } else if (win == "NO_APP") {
                      console.log('no suitable app to open the file (mainly will appear on android')
                  } else {
                      console.log('error')
                  }
              },
          error => console.error("open failed", error),
          File.dataDirectory+'byteArray.pdf',
    );
    // Browser.open({url:File.dataDirectory+'/pleasepleasework.pdf'})
    // await FileOpener.open(
    //   File.dataDirectory+'/pleasepleasework.pdf',
    //   "application/pdf"
    // );

    }catch(e){
      console.error(e);
    }
    // await Filesystem.writeFile({
    //   path: 'secrets/text.txt',
    //   data: blob,
    //   directory: Directory.Documents,
    // });
    // const objectURL = URL.createObjectURL(blob);
    // console.log('blob',objectURL);

    // FileSaver.saveAs("http://localhost:8090/", "richa.pdf");

    //   const { uri } = await writeFile({
    //     path: "media/pdf/sample.pdf",
    //     directory: FilesystemDirectory.Data,
    //     data: blob,
    //     recursive: true,
    //     fallback(writeError) {
    //     console.log(writeError);
    //     const shouldFallback = process.env.NODE_ENV === "production";
    //     return shouldFallback;
    //   }
    // });

    // const {uri} = await Filesystem.writeFile({
    //   path: 'secrets/text.txt',
    //   data: res,
    //   directory: Directory.Documents,
    //   encoding: Encoding.UTF8,
    // });

    //if(window && 'PreviewAnyFile' in window){
    //   window['PreviewAnyFile'].previewPath(
    //     win =>
    //         {
    //             if (win == "SUCCESS") {
    //                 console.log('success')
    //             } else if (win == "CLOSING") {
    //                 console.log('closing')
    //             } else if (win == "NO_APP") {
    //                 console.log('no suitable app to open the file (mainly will appear on android')
    //             } else {
    //                 console.log('error')
    //             }
    //         },
    //     error => console.error("open failed", error),
    //     objectURL
    // );
    //   window['PreviewAnyFile'].previewPath(
    //     win => console.log("open status",win),
    //     error => console.error("open failed", error),
    //     objectURL,{name : 'file.pdf'}
    // );
    //}



  }
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const handleClick = async () => {
    //     // await Browser.open({ url: base64 });
    //const blob = dataURItoBlob(base64);

    //     // window.open(url, '_blank');
    //     FileOutputStream fos = new FileOutputStream(filepath);
    // fos.write(Base64.decode(base64String, Base64.NO_WRAP));
    // fos.close();
    // window.open("data:application/pdf;base64," + Base64.encode(out));
    // const blob = b64toBlob(base64, 'application/pdf');
    // const blobUrl = URL.createObjectURL(blob);
    // console.log('blobUrl',blobUrl);
    // let metadata = {
    //   type: 'application/pdf'
    // };
    // let file = new File([blob], "sample.pdf", metadata);
    // const url = URL.createObjectURL(file);
    // console.log('file',file,url);
    // window.open(url, '_blank');
    // Browser.open({url:base64});
    //showFromUrl();
    //downloadURI('http://localhost:8090/','temp.pdf');
    // console.log('Calling', PreviewAnyFile.prototype.previewBase64)
    // PreviewAnyFile.prototype.previewBase64(
    //   base64
    // );
    // const res = await fetch('http://localhost:8090/');
    // const blob = await res.blob();
    // console.log('res',blob);
    //downloadVideo();
    downloadURI('http://localhost:8090/','temp.pdf');



  };

  const downloadOpenusingFile = async() =>{
      const options = {
        url: 'http://localhost:8090/',
        // Optional
        method: 'GET',
      };

    // //   // Writes to local filesystem
    const response = await Http.request(options);
    console.log('File written to ',File.dataDirectory+'pleasepleasework.pdf');
    console.log('Response data',response.data);
    const filepath = await  File.writeFile(
      File.dataDirectory,
      'downloadedFile.pdf',
      new Blob([response.data]),
      {
        replace: true,
      }
    );
    console.log('filepath',filepath);
    window['PreviewAnyFile'].previewPath(
          win =>
              {
                  if (win == "SUCCESS") {
                      console.log('success')
                  } else if (win == "CLOSING") {
                      console.log('closing')
                  } else if (win == "NO_APP") {
                      console.log('no suitable app to open the file (mainly will appear on android')
                  } else {
                      console.log('error')
                  }
              },
          error => console.error("open failed", error),
          File.dataDirectory+'downloadedFile.pdf',
    );
  }
  const launchUsingbase64 = async() =>{
      window['PreviewAnyFile'].previewBase64(
        win =>
            {
                if (win == "SUCCESS") {
                    console.log('success')
                } else if (win == "CLOSING") {
                    console.log('closing')
                } else if (win == "NO_APP") {
                    console.log('no suitable app to open the file (mainly will appear on android')
                } else {
                    console.log('error')
                }
            },
        error => console.error("open failed", error),
        BASE64,
        {mimeType:'application/pdf'}
    );
  }


  return (

    <IonApp>
      <IonPage>
        <div style={{ height: '90vh' }}>
          <div style={{ height: '300px', backgroundColor: 'red' }}>Header</div>
          <IonButton onClick={handleClick}>Click Me </IonButton>
          <IonButton onClick={() => window.open('http://localhost:8090/')}>window open </IonButton>
          <IonButton onClick={launchUsingbase64}>Base 64  </IonButton>
          <IonButton onClick={downloadOpenusingFile}>Download and Open </IonButton>
        </div>
      </IonPage>
    </IonApp>
  );
};

export default App;
