pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KshazuMain is ERC721, Ownable {
    address public ceoaddres;
    //string public tokenURIPrefix;

    struct Kshazu {
        uint256 genes;
        uint256 born;
        uint256 matronId;
        uint256 sireId;
    }
    //mapping(string => bool) _colorExists;
    Kshazu[] public kshazus;

    event KshazuSpawned(uint256 indexed _kshazuId, address indexed _owner, uint256 _genes);
    event KshazuEvolved(uint256 indexed _kshazuId, uint256 _oldGenes, uint256 _newGenes);

    constructor() public ERC721("Kshazu", "KSH") {
        //tokenURI = "http://139.180.158.2/kshazu/get/";
        _setBaseURI("http://139.180.158.2/kshazu/get/");
        ceoaddres = msg.sender;
        _spawnKshazu(99999999999999, ceoaddres,0,0); //adam
        _spawnKshazu(98999898989898, ceoaddres,0,0); //eve
        _spawnKshazu(97979797979797, ceoaddres,0,0); //cia
        _spawnKshazu(96969696969696, ceoaddres,0,0); //diago1
        _spawnKshazu(96959796989995, ceoaddres,0,0); //diago2
        _spawnKshazu(98989797939995, ceoaddres,0,0); //diago3
        _spawnKshazu(96969796989997, ceoaddres,0,0); //diago4
        _spawnKshazu(99999996979995, ceoaddres,0,0); //diago5
        _spawnKshazu(99989996959996, ceoaddres,0,0); //diago6
    }
    
    function _spawnKshazu(uint256 _genes, address _owner, uint256 _matronId, uint256 _sireId) public onlyOwner returns (uint256 _kshazuId) {
        Kshazu memory _kshazu = Kshazu(_genes, now,_matronId,_sireId);
        kshazus.push(_kshazu);
        _kshazuId = kshazus.length - 1;
        _mint(_owner, _kshazuId);
        KshazuSpawned(_kshazuId, _owner, _genes);

        emit KshazuSpawned(_kshazuId,_owner,_genes);
    }

    /*function baseTokenURI() public view returns (string memory) {
        return tokenURIPrefix;
    }*/
}