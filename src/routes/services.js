const express = require("express");
const data = require("../data");

const router = express.Router();
const { accounts, writeJSON } = data;

// Get routes
router.get("/transfer", (req,res) => res.render("transfer"));
router.get("/payment", (req,res) => res.render("payment", { account: accounts.credit }));

// Post routes
router.post("/transfer", (req, res) => {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);
    writeJSON();
    res.render("transfer",{ message: "Transfer Completed" });
});
router.post("/payment", (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render("payment",{ message: "Payment Successful", account: accounts.credit });
});

module.exports = router;