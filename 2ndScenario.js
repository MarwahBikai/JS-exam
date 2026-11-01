const transactions = [
  { id: 1, type: "deposit", amount: 1000 },
  { id: 2, type: "withdraw", amount: 200 },
  { id: 3, type: "deposit", amount: 500 },
  { id: 4, type: "withdraw", amount: 100 }
];

const calculateTotalTransactionsByType=(transactions,typeToCheck)=>{
    if(transactions.length===0)
    return 0
    const transactionsFiltered= transactions.filter(transaction=>transaction.type===typeToCheck)
    const amounts= transactionsFiltered.map(transaction=>transaction.amount)
    return amounts.reduce((sum,amount)=> sum+amount,0)
}
console.log(calculateTotalTransactionsByType(transactions,'deposit'))
console.log(calculateTotalTransactionsByType(transactions,'withdraw'))

const calculateFinalBalance=(transactions)=>{
    if(transactions.length===0)
    return 0
    const amounts= transactions.map(transaction=>transaction.amount)
    return amounts.reduce((sum,amount)=>sum+amount,0)
}
console.log(calculateFinalBalance(transactions))

const returnLargestTransaction=(transactions)=>{
    let largestTransaction=transactions[0]
    transactions.forEach((transaction)=>{

        if(transaction.amount> largestTransaction.amount){
            largestTransaction=transaction
        }
    })
    return largestTransaction
}
console.log(returnLargestTransaction(transactions))

const returnWithDrawals=(transactions)=>{
    if (transactions.length===0)
      return []
    return transactions.filter((transaction)=>transaction.type==='withdraw')
}

console.log(returnWithDrawals(transactions))

const withDrawTransaction=(transactions,id)=>{
  const transaction= transactions.find((transaction)=>transaction.id===id)
  if(!transaction)
   return {success:false,message:"Cannot find transaction"}

   const balance= calculateFinalBalance(transactions)

   if (transaction.amount>balance)
      return {success:false,message:"Cannot withdraw transaction, amount greater than current balance"}

   transaction.type='withdraw'
   transactions[transactions.findIndex(transaction=>transaction.id===id)]=transaction

   return {success:true, message:`Withdrawal is successful to transaction ${transaction.id}`}
}

console.log(withDrawTransaction(transactions,1))

const validateTransaction=(type,amount)=>{

if (!type || typeof type !=='string'){
    return "type if required and should be a string"
}
if (!amount || typeof amount !=='number'){
    return "amount if required and should be a number"
}
return null
}
const generateNewID=(transactions)=>{
    if (transactions.length===0)
      return 1
    const Ids=transactions.map(transaction=>transaction.id)
    return Math.max(...Ids)+1
}
const addTransaction=(transactions,type,amount)=>{
  const errorMessages= validateTransaction(type,amount)
  if(errorMessages){
    return {success:false,message:"input is invalid"}
  }
  const newID= generateNewID(transactions)
  const newTransaction={
    id:newID,
    type,
    amount
  }
  transactions.push(newTransaction)
  return {sucess:true,message:"added transaction successfully",
  transactions:transactions
  }
}
console.log(addTransaction(transactions,'deposit',3000))