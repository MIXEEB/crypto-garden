import Web3 from 'web3';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbiItem } from 'web3-utils';
import FlowerToken from "src/assets/solidity-artifacts/FlowerToken.json"


@Injectable()
export class FlowerTokenService {
    private web3: Web3;
    private flowerTokenContract;

    private contractAddress: string = environment.flowerTokenContract;

    constructor() {
        this.web3 = new Web3(environment.web3host);
        this.flowerTokenContract = new this.web3.eth.Contract(FlowerToken.abi as AbiItem[], this.contractAddress);
    }
   
    public getFlowerIds = (address: string): Observable<any> => {
        console.log(this.flowerTokenContract.methods);

        return from(this.flowerTokenContract.methods.getAllFlowers(address).call());
    }

    public getFlower = (id: number): Observable<any> => {
        return from(this.flowerTokenContract.methods.flowers(id).call());
    }
}