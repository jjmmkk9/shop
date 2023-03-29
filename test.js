const arr = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 2, name: "test3" },
    { id: 3, name: "test4" },
    { id: 4, name: "test5" },
    { id: 5, name: "test6" },
    { id: 5, name: "test7" },
    { id: 6, name: "test8" }
  ];

  const numbers = [2, 5, 1, 1, 2, 2, 3, 4, 5];

  const newNumbers = numbers.filter((number, index, target) => {
                //indesOf는 만족하는 첫 인덱스를 뱉으니까.
    return target.indexOf(number) === index;
});

