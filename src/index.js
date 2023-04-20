import React from 'react';
import ReactDOM from 'react-dom/client';

import { response } from './bd-simulator';

// parse response and set them some id-s
const resp = JSON.parse(response).map((product, i) => {
    product.id = i;
    return product;
})

class ProductRow extends React.Component{
    render(){
        return (
            <tr className='row'>
                <td className='name'>{'Name'}</td>
                <td className='price'>{'Price'}</td>
            </tr>
        )
    }
}
console.log(resp);

class ProductCategoryRow extends React.Component{
    render(){
        return(
            <thead>
                <tr>
                    <th className='category' colSpan={2}>{'Category'}</th>
                </tr>
            </thead>

            
        )
    }
}

class ProductTable extends React.Component{
    sortCategories(products){
        // result: {<categoryName>: {id: <categoryId>, content: <categoryContent>}, 
        //          ...}
        const output = {};
        let nextCategoryId = 0;
        
        for(let product of products){
            const category = product.category;
            if(!output[category]) {
                // handing of a never-met-before category name
                output[category] = {id: nextCategoryId, products: []}; // create such cateroty in output
                nextCategoryId++;
            }
            output[category].products.push(product);
        }
        return output;
    }

    render(){
        console.log('formed products by category:', this.sortCategories(resp));
        const sortedCats = this.sortCategories(resp);
        const renderedCategories = Object.keys(sortedCats).map(catName => {
            return ([
                <ProductCategoryRow key={sortedCats[catName].id}/>,
                <tbody key={sortedCats[catName].id + 1000}>
                    {sortedCats[catName].products.map(product => {
                        return <ProductRow key={1000 + product.id} params={product}/>
                    })}
                </tbody>

            ])
        }).flat();
        //console.log('frendered categories:', renderedCategories);
        return (
            <table className='product-table' style={{width: '150px'}}>
                {renderedCategories}
            </table>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProductTable/>)