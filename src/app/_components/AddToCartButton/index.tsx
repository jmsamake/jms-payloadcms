'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'

// React.FC is a type that stands for "Function Component" in React.
// It is a generic type that allows you to specify the props that a function component will accept
export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  className?: string
  appearance?: Props['appearance']
}> = props => {
  const { product, quantity = 1, className, appearance = 'primary' } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  const [isInCart, setIsInCart] = useState<boolean>()
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isInCart ? `✓ View in cart` : `Add to cart`}
      el={isInCart ? 'link' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        appearance === 'default' && isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={
        !isInCart
          ? () => {
              addItemToCart({
                product,
                quantity,
              })

              router.push('/cart')
            }
          : undefined
      }
    />
  )
}
