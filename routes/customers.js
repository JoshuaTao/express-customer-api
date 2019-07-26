const express =require('express');
const Customer =require('../models/Customer');
const router =express.Router();
const verifyToken= require('../verifyToken');


router.get('/',(req,res)=>{
    Customer.find({})
     .then(customers=>res.send(customers))
      .catch(err=>console.log(err))
})

router.get('/:id',(req,res)=>{
    Customer.findById(req.params.id)
     .then(customer=>{
         if(!customer) return res.json({msg:`There is no customer with the id of ${req.params.id}`});
         res.send(customer);
        })
      .catch(err=>console.log(err))
})

router.post('/',verifyToken,(req,res)=>{
       if(!req.is('application/json')) return res.send("Expect 'application/json'");
        const {name,email,balance}=req.body;
        Customer.findOne({email})
          .then(customer=>{
            if(customer) return res.json({msg:'Customer already exists'})
            const newCustomer =new Customer({
              name,
              email,
              balance
            })
            newCustomer.save()
              .then(customer=>res.send(customer))
              .catch(err=>console.log(err))
          })
        }) 


router.put('/:id',verifyToken,(req,res)=>{
    if(!req.is('application/json')) return res.send("Expect 'application/json'")
    Customer.findByIdAndUpdate(req.params.id,req.body)    //findByIdAndUpdate
      .then(customer=>{
         if(!customer) return res.json({msg:`There is no customer with the id of ${req.params.id}`});
         res.json({msg:'Updated successfully'})
        })
      .catch(err=>console.log(err))
})

router.delete('/:id',verifyToken,(req,res)=>{
    Customer.findByIdAndDelete(req.params.id)
      .then(customer=>{
        if(!customer) return res.json({msg:`There is no customer with the id of ${req.params.id}`});
        res.json({msg:'Deleted successfully'})
      })
      .catch(err=>console.log(err))
})

module.exports = router;