let solve N Aa =
  let flip (a,b) = (b,a)
  let Xm = Aa |> Array.distinct |> Array.sort |> Array.indexed |> Array.map flip |> Map
  Aa |> Array.map (fun x -> Xm.[x]+1)

let N = stdin.ReadLine() |> int
let Aa = stdin.ReadLine().Split() |> Array.map int
solve N Aa |> Array.map string |> String.concat " " |> stdout.WriteLine
