/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */

// function to check sock pairs
 const solution = (p, c) => {
  let count = 0
  let ab = p

  if(p === 0 || c === 0){
      return 0
  }

  for (i = 2; i <= p; i +=2 ){
      count++
         ab -= 2
      if(count === c){
          return count
      }
  }

 return count

}


function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {

  let count = noOfWashes
  let cleanPileObj = {}
  let newDirtyPile = [...dirtyPile]

// convert cleanPile to objects
  function convertToObj() {
      cleanPileObj = cleanPile.reduce( (tally, fruit) => {
          tally[fruit] = (tally[fruit] || 0) + 1 ;
          return tally;
      } , {})
  }

  // create dirtyPile Objects
  dirtyPileObj = dirtyPile.reduce( (tally, fruit) => {
      tally[fruit] = (tally[fruit] || 0) + 1 ;
      return tally;
  } , {})


  // delete removed sock from Object
  function deleteValue(key, obj, type = 1) {
      obj[key] -= type
  }

  // function to call pair function and get total pair
  function checkPair() {
      let pair = 0
      for (const key in cleanPileObj) {
          pair += solution(cleanPileObj[key])
      }

      return pair
  }

  // function to check if property is in object
  function checkOjects(value, obj) {
      return !!obj[value]
  }

  // call the fuction to create cleanPile Object
  convertToObj()

  // calculate the total pair in cleanPile Objects if noOfWashes id 0
  if (noOfWashes === 0) {
      return checkPair()
  }

    // function to check properties in dirtyPile that has values greater than 0
  function checkDirtyObj() {
      const odd = []
      for (const key in dirtyPileObj) {
          if(dirtyPileObj[key] > 0 ) {
              odd.push(key)
          }
      }

      return odd.length > 0
  }

  // function to get a random sock from dirtyPile
  function getRandomDirtyPile() {
      const arr = []
      for (const key in dirtyPileObj) {
          if (dirtyPileObj[key] > 0) {
              arr.push(key)
          }
      }

      const value = arr.length > 0 ? arr[0] : 0
      return Number(value)
  }

  // function to get a sock from clean pile that has an incomplete pair
  function getCleanPile() {
      const odd = []
      for (const key in cleanPileObj) {
          if(cleanPileObj[key] % 2 !== 0) {
              odd.push(key)
          }
      }
      const value = odd[0]
      return Number(value)
  }

 // function to get one sock from cleanPile
  function getOneClean() {
      const odd = []
      for (const key in cleanPileObj) {
          if(cleanPileObj[key] === 1) {
              odd.push(key)
          }
      }

      const value = odd[0]
      return Number(value)
  }

   // function to get one sock from dirtyPile
  function getOneDirty() {
      const one = []
      for (const key in dirtyPileObj) {
          if(dirtyPileObj[key] === 1) {
              one.push(key)
          }
      }
      const value = one[0]
      return Number(value)
  }

  // function to get a pair at once from dirtyPile
  function getTwoDirty() {
      const arr = []
      for (const key in dirtyPileObj) {
          if(dirtyPileObj[key] % 2 === 0  && dirtyPileObj[key] > 0) {
              arr.push(key)
          } else if ( dirtyPileObj[key] > 2) {
              cleanPileObj[key] ? cleanPileObj[key] += 2 : cleanPileObj[key] = 2
              deleteValue(key, dirtyPileObj, 2)
              count -= 2
          }
      }

      const value = arr[0]
      return Number(value)
  }

  function getGreaterValueInDirty(key) {
      const f = Object.keys(cleanPileObj).filter((d) => {
          return cleanPileObj[d] > cleanPileObj[key] && dirtyPileObj[d] > cleanPileObj[key]
      } )
      return Number(f[0])
  }

 for(let i = 0; i < newDirtyPile.length; i++ ) {
     if (!checkDirtyObj() || count === 0) {
         break;
     }

     const value =  getCleanPile()
     if (checkOjects(Number(value), dirtyPileObj) && count > 0) {
        cleanPileObj[value] ? cleanPileObj[value] += 1 : cleanPileObj[value] = 1
          deleteValue(value, dirtyPileObj)
          count -= 1
      }

     if ( count === 1) {
          const oneValue = getOneClean()
          if (dirtyPileObj[oneValue]) {
              cleanPileObj[oneValue] += 1
              deleteValue(oneValue, dirtyPileObj)
              count -= 1
          }
      }

     if (count === 2) {
          let twoValue = getTwoDirty()
          if (count > 0) {
            if (twoValue) {
              const type = 2
              cleanPileObj[twoValue] ? cleanPileObj[twoValue] += 2 : cleanPileObj[twoValue] = 2
              deleteValue(twoValue, dirtyPileObj, type)
              count -= 2
            } else {
              let oneVal = getOneDirty()
              cleanPileObj[oneVal] ? cleanPileObj[oneVal] += 1 : cleanPileObj[oneVal] = 1
              deleteValue(oneVal, dirtyPileObj)
              oneVal = getOneDirty()
              cleanPileObj[oneVal] ? cleanPileObj[oneVal] += 1 : cleanPileObj[oneVal] = 1
              deleteValue(oneVal, dirtyPileObj)
              count -= 1
            }
          }
     }

     if (count > 2) {
          const value = getRandomDirtyPile()
          cleanPileObj[value] ? cleanPileObj[value] += 1 : cleanPileObj[value] = 1
          deleteValue(value, dirtyPileObj)
          count -= 1
     }

 }

  return checkPair()

}

module.exports = getMaxPairs;
