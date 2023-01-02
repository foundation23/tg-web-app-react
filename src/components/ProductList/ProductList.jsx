import React, {useCallback, useEffect, useState} from 'react';
import "./ProductList.css"
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/hooks";

const products = [
    {id: '1', title: 'Samsung Galaxy S22 Ultra', price: 83645, description: 'черный фантом'},
    {id: '2', title: 'Apple iPhone 13', price: 68990, description: 'альпийский зеленый'},
    {id: '3', title: 'vivo Y35', price: 11990, description: 'черный агат'},
    {id: '4', title: 'REALME narzo 50A', price: 10990, description: 'зеленый'},
    {id: '5', title: 'Apple iPhone 13 Pro Max', price: 110790, description: 'альпийский зеленый'},
    {id: '6', title: 'Apple iPhone 11', price: 40990, description: 'черный'},
    {id: '7', title: 'Samsung Galaxy S21 FE', price: 43847, description: 'серый'},
    {id: '8', title: 'Honor 70', price: 40490, description: 'черный'},

]
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}



const ProductList = () => {
    const [addedItems, setAddedItems] = useState([])
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id)
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }

        setAddedItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;