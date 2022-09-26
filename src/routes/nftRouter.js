const express = require('express');
const Nft = require('../models/Nft');

require('dotenv').config();

const router = express.Router();

// Get specific nft by query
router.get('/', async function (req, res) {
  const { address, projecturl, owner } = req.query;

  try {
    let filter = {};
    if (address) {
      filter.address = address;
    }
    if (projecturl) {
      filter.projecturl = projecturl;
    }
    let nfts = await Nft.find(filter);
    return res.status(200).json(nfts);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

// Get all NFTs with project url
router.get('/project/:url', async function (req, res) {
  const { url } = req.params;
  try {
    let nfts = await Nft.find({ projecturl: url });
    if (!nfts) throw new Error('No record found.');

    return res.status(200).json(nfts);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

// Get all NFTs with owner's address
router.get('/owner/', async function (req, res) {
  const { owner } = req.query;
  let filter = {};

  if (owner) {
    filter.owner = owner;
  }
  try {
    let ownerNFTs = await Nft.find(filter);
    if (!ownerNFTs) throw new Error('No record found.');

    return res.status(200).json(ownerNFTs);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

// Get all NFTs with owner's address
router.get('/owner/', async function (req, res) {
  const { ownerAddress } = req.params;
  console.log(ownerAddress)
  try {
    let ownerNFTs = await Nft.find({ owner: ownerAddress });
    if (!ownerNFTs) throw new Error('No record found.');

    return res.status(200).json(ownerNFTs);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

// Get specific NFT by Address
router.get('/:nftAddress', async function (req, res) {
  const { nftAddress } = req.params;
  console.log(nftAddress)
  try {
    let foundNFT = await Nft.findOne({ address: nftAddress });
    if (!foundNFT) throw new Error('No record found.');

    return res.status(200).json(foundNFT);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

router.post('/newNFT', express.raw({ inflate: true, limit: '50mb', type: () => true }), async function (req, res) {
  console.log(req.body)
  const { address, nftName, imageLink, projecturl, transactions, price, owner, discount } =
    req.body;

  if (
    !address ||
    !nftName ||
    !imageLink ||
    !projecturl ||
    !transactions ||
    !price ||
    !owner ||
    !discount
  ) {
    return res.status(400).json({
      error: 'Missing required fields',
      address,
      nftName,
      imageLink,
      transactions,
      price,
      projecturl,
      owner,
      discount
    });
  }

  try {
    let new_nft = new Nft({
      address,
      nftName,
      imageLink,
      projecturl,
      transactions,
      price,
      owner,
      discount
    });
    await new_nft.save();
    return res.status(200).json(new_nft);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

router.patch('/patchNFTPrice', async function (req, res) {
  const { address, price } =
    req.body;

    console.log(address + ' ' + price)
  if (
    !address ||
    !price
  ) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }

  try {
    let updated_NFT = await Nft.updateOne({ address: address }, {
      $set: {
        price: price
      }
    });
    return res.status(200).json(updated_NFT);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});
module.exports = router;
