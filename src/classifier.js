/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */


// get age of student
 const ageOfStudent = (date) => {
  const age = new Date().getFullYear() - new Date(date).getFullYear()
  return age
}

// check groups before assigning a student
const checkGroup = (student, groups ) => {
  return groups.every((st) => {
  if (ageOfStudent(st.dob) < ageOfStudent(student.dob)) {
      return ageOfStudent(student.dob) - ageOfStudent(st.dob) <= 5
  }
      return ageOfStudent(st.dob) - ageOfStudent(student.dob) <= 5
  })
}

// Create new groups function
const createGroups = (studentArr) => {
  let groups = []
  groups.push(studentArr.splice(0, 1))


  while(studentArr.length > 0) {
      let bool = false
      const student = studentArr.splice(0, 1)[0]
      groups.forEach((group) => {
          if (checkGroup(student, group) && group.length <= 2) {
              group.push(student)
              bool = true
          }
      })
      if (!bool) {
          groups.push([student])
      }
  }
    return groups
}


function classifier(input) {

  const studentArr = JSON.parse(JSON.stringify(input))

  if (studentArr.length === 0) return { noOfGroups: 0 }

  // Set age of students in group
  for(let i = 0; i < studentArr.length; i++){
    let date =  new Date().getFullYear() - new Date(studentArr[i].dob).getFullYear()
    studentArr[i].age = date
  }

  // sort groups
  studentArr.sort((a, b) => a.age - b.age)

  let chunked = {}
  let count = 0

  // get the maximum age in a group
  const max = (arr) => Math.max(...arr)

  // get the total sum of ageSum
  const ageSum = (arr) => arr.reduce((a, b) => { return a + b}, 0)

  // create groups of students
  const chonked = createGroups(studentArr)

    // loop through each group and update member info
  for(let i = 0; i < chonked.length; i++) {
      let sortedMembers = []

      chonked[i].forEach((grp) => {
          sortedMembers.push({
              name: grp.name,
              age: grp.age,
              dob: grp.dob,
              regNo: grp.regNo
          })
      })

      const allAges = sortedMembers.map((member) => member.age)
      const sumOfAllAges = ageSum(allAges)
      const regNos = chonked[i].map((member) => Number(member.regNo))
      regNos.sort((a, b) => a - b)

      count += 1

      // update group info according to their group name
      chunked[`group${count}`] = {
          oldest: max(allAges),
          members: sortedMembers,
          sum: sumOfAllAges,
          regNos
      }
  }
  // update number of groups
  chunked.noOfGroups = count
  return chunked
}

module.exports = classifier;
