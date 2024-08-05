 type Product ={
    "id":number,
    "title":string,
    "price":number,
    "description":string,
    "category":string,
    "image":string,
    "rating":Rating,
    "qty":number,
    "countInstock":number
}
 type Rating ={
    "rate":number,
    "count":number,
}
