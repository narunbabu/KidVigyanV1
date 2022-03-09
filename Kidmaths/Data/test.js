import { problem_structure } from "./Data";
// const problem_structure = [
//     {
//       number_problems: 10,
//       level_numpro: [[1, 10]],
//     },
//     {
//       number_problems: 5,
//       level_numpro: [
//         [1, 8],
//         [2, 2],
//       ],
//     },
//     {
//       number_problems: 5,
//       level_numpro: [
//         [1, 6],
//         [2, 4],
//       ],
//     },
//     {
//         number_problems: 5,
//         level_numpro: [
//           [1, 4],
//           [2, 6],
//         ],
//       },
//     {
//       number_problems: 10,
//       level_numpro: [[2, 10]],
//     },
//     {
//       number_problems: 5,
//       level_numpro: [
//         [2, 8],
//         [3, 2],
//       ],
//     },
//     {
//       number_problems: 5,
//       level_numpro: [
//         [2, 6],
//         [3, 4],
//       ],
//     },
//     {
//         number_problems: 5,
//         level_numpro: [
//           [2, 4],
//           [3, 6],
//         ],
//       },
//     {
//       number_problems: 10,
//       level_numpro: [[3, 10]],
//     },
//     {
//       number_problems: 5,
//       level_numpro: [
//         [3, 8],
//         [4, 2],
//       ],
//     },
//     {
//       number_problems: 5,
//       level_numpro: [
//         [3, 6],
//         [4, 4],
//       ],
//     },
//     {
//         number_problems: 5,
//         level_numpro: [
//           [3, 4],
//           [4, 6],
//         ],
//       },
//     {
//       number_problems: 10,
//       level_numpro: [[4, 10]],
//     },
//   ];

  const cumulativeSum = (sum => value => sum += value)(0);


  console.log(problem_structure[0])
  const k=17
  nprobs=problem_structure.map(k=>k.number_problems)
  console.log(nprobs,nprobs.reduce((total,num)=>total+num))
  cumarray=nprobs.map(cumulativeSum)
  ind=cumarray.findIndex(e=>e>k)
  console.log(ind);