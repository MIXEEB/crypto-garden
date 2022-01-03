import Web3 from 'web3';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AbiItem } from 'web3-utils';
import SeedToken from "src/assets/solidity-artifacts/SeedToken.json"


@Injectable()
export class SeedTokenService {
    private web3: Web3;
    private seedTokenContract;

    private contractAddress: string = environment.seedTokenContract;

    constructor() {
        this.web3 = new Web3(environment.web3host);
        this.seedTokenContract = new this.web3.eth.Contract(SeedToken.abi as AbiItem[], this.contractAddress);
    }
    
    public getAccounts = () => {
        return from(this.web3.eth.getAccounts());
    }

    public getSeedBalance = (address: string): Observable<any> => from(this.seedTokenContract.methods.balanceOf(address).call());

    public plant = (address: string): Observable<any> => from(this.seedTokenContract.methods.plantSeed().send({
        from: address,
        gas: 6721975,
        gasPrice: '20000000000'
    }));
}