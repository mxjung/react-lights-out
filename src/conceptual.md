## App.js

<Gameboard size>

## Gameboard.js

Gameboard({size}) 

boxArry = [[true,...], [false...]....] (by size)

const [box, changeBox] = useState([boxArray])

 const change = (row, col) => {
    changeBox(box => (helperFcn(box, row, col)));
    changeBox(box => (helperFcn(box, row+1, col+1)));
    changeBox(box => (helperFcn(box, row, col)));
  };

helperFcn() {
  return new 2D array
}

return (map(i => 
          map j => 
             <Box change={change} row={i} col={j}>)


## Box 

Box({change, row, col})
return (<Button onclick={() => change(row, col))}>)