import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { IoTrashBinOutline } from 'react-icons/io5'
// // import img1 from '../../../assets/MedicineV2/Cart/image1.svg'
// import truck from '../../../assets/MedicineV2/Cart/truck.svg'
import { Auth, UserInfo } from '../../../context/allContext'
import { dateTime } from '../../../utils/date'
import Authentication from '../../Authentication/Authentication'
import classes from './Cart.module.css'

const Cart = ({
    medicineLines,
    removeItem,
    setMedicineLines,
    activeStyle,
    showModal,
    setShowModal,
    api,
    setActiveStyle,
    total,
    setTotal,
    setIsOpen,
    isLoading,
}) => {
    const currentDate = dateTime

    const { stateAuth } = useContext(Auth)
    const token = stateAuth?.token
    const { stateUser } = useContext(UserInfo)
    const userDetail = stateUser?.info

    const calculateSubtotal = () => {
        return medicineLines.reduce((sum, item) => {
            const price = Number(item.unit_price) || 1
            const qty = Number(item.quantity) || 1
            return sum + price * qty
        }, 0)
    }

    const subtotal = calculateSubtotal()
    const discount = subtotal * 0.08
    const shipping = 60
    const grandTotal = subtotal - discount + shipping

    useEffect(() => {
        setTotal(grandTotal)
    }, [medicineLines, setTotal, grandTotal])

    const removeAll = () => {
        setMedicineLines([])
        console.log('Remove all items')
    }

    const decreaseQuantity = (id) => {
        setMedicineLines((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const currentQty = Number(item.quantity) || 1
                    const newQty = currentQty > 1 ? currentQty - 1 : 1
                    const price = Number(item.unit_price) || 1
                    return {
                        ...item,
                        quantity: newQty,
                        total_price: price * newQty,
                    }
                }
                return item
            })
        )
    }

    const increaseQuantity = (id) => {
        setMedicineLines((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const currentQty = Number(item.quantity) || 1
                    const newQty = currentQty + 1
                    const price = Number(item.unit_price) || 1
                    return {
                        ...item,
                        quantity: newQty,
                        total_price: price * newQty,
                    }
                }
                return item
            })
        )
    }

    const handleShowModal = () => {
        setShowModal(true)
        setActiveStyle(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formattedMedicineLines = medicineLines.map((item) => ({
            name: item.name || 'Unnamed Product',
            generic: item.generic || '',
            form: item.form || item.type || '',
            strength: item.strength || item.dosage || '',
            pharmaceuticals: item.pharmaceuticals || item.manufacturer || '',
            quantity: Number(item.quantity) || 1,
            unit_price_tp: Number(item.unit_price) || 0,
            unit_price_mrp: Number(item.unit_price) || 0,
            total_mrp: item.total_price || (Number(item.unit_price) || 1) * (Number(item.quantity) || 1),
            unit_discount_percent: 0,
            total: item.total_price || (Number(item.unit_price) || 1) * (Number(item.quantity) || 1),
        }))

        const details = [
            {
                service_name: 'medicine_order',
                patient_id: userDetail?.id,
                service_issuer_id: userDetail?.id,
                service_issuer_type: 'main site',
                order_placement: currentDate,
                order_completion: null,
                remarks: 'Order from main website please call for details',
                current_address: 'Dhaka',
                order_value: subtotal,
                order_status: 'pending',
                discount_percent: 8,
                payable_amount: subtotal - subtotal * 0.08,
                payment_by_customer: 0,
                payment_pending: subtotal - subtotal * 0.08,
                last_payment_date: null,
                payment_method: 'cash on delivery',
                payment_status: 'pending',
                service_provider_type: 'pharmacy',
                service_provider_id: 1,
                service_provider_fee: 0,
                service_provider_fee_paid: 0,
                service_provider_fee_pending: 0,
                service_provider_fee_last_update: null,
                service_provider_fee_status: '',
                referral_type: null,
                referral_id: 1,
                referral_provider_fee: 0,
                referral_provider_fee_paid: 0,
                referral_provider_fee_pending: 0,
                referral_provider_fee_last_update: 0,
                referral_provider_fee_status: null,
            },
            formattedMedicineLines,
        ]

        console.log(details, 'scdac')
        let postFetch = await fetch(`${api}/patients/service/medicines`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(details),
        })
        console.log(postFetch.ok, 'dd')
        if (postFetch.ok) {
            setMedicineLines([])
            setIsOpen(true)
            alert('Medicine Order Successful!')
        } else {
            alert('Something went wrong!, Fill the quantity properly!')
        }
    }

    return (
        <>
            <div className={classes.medOrder}>
                <div className={classes.cartSection}>
                    <h2>Medicine Cart</h2>
                    <div className={classes.cardWrapper}>
                        <div className={classes.cartContainer}>
                            {/* Left - Items */}
                            <div className={classes.cartItemsWrapper}>
                                <div className={classes.cartInfo}>
                                    <div className={classes.infoIcon}>ℹ️</div>
                                    <div className={classes.cartInfoText}>
                                        <h4>Check Your Medicine Before Checkout</h4>
                                        <p>Make Sure You Ordered Right Medicine</p>
                                    </div>
                                </div>

                                <div className={classes.cartHeaderBorder}>
                                    <div className={classes.cartHeader}>
                                        <div className={classes.cartTitle}>
                                            Cart{' '}
                                            <span className={classes.itemCount}>
                                                {medicineLines.length} {medicineLines.length === 1 ? 'item' : 'items'}
                                            </span>
                                        </div>
                                        <button
                                            className={classes.removeAllBtn}
                                            onClick={removeAll}
                                            disabled={medicineLines.length === 0 || isLoading}>
                                            <IoTrashBinOutline size={20} />
                                            <span> Remove All</span>
                                        </button>
                                    </div>
                                </div>

                                <div className={classes.cartItems}>
                                    {medicineLines.length === 0 ? (
                                        <div className={classes.emptyCart}>
                                            <p>Your cart is empty</p>
                                        </div>
                                    ) : (
                                        medicineLines.map((item) => (
                                            <div className={classes.cartItem} key={item.id}>
                                                <div className={classes.itemDetails}>
                                                    <h4>{item.name || 'Unnamed Product'}</h4>
                                                    <p>
                                                        {item.manufacturer || item.pharmaceuticals} |{' '}
                                                        {item.dosage || item.strength} | {item.type || item.form}
                                                    </p>
                                                    <p className={classes.itemPrice}>
                                                        ৳{(Number(item.unit_price) || 1).toFixed(2)} Per{' '}
                                                        {item.packageType || 'Unit'}
                                                    </p>
                                                </div>

                                                <div className={classes.itemActions}>
                                                    <div className={classes.quantityControl}>
                                                        <button
                                                            onClick={() => decreaseQuantity(item.id)}
                                                            className={`${classes.quantityBtn} ${
                                                                Number(item.quantity) <= 1 ? classes.disabledBtn : ''
                                                            }`}
                                                            disabled={Number(item.quantity) <= 1 || isLoading}>
                                                            −
                                                        </button>

                                                        <div className={classes.quantity}>
                                                            <span>
                                                                {String(Number(item.quantity) || 1).padStart(3, ' ')}
                                                            </span>
                                                        </div>

                                                        <button
                                                            onClick={() => increaseQuantity(item.id)}
                                                            className={classes.quantityBtn}
                                                            disabled={isLoading}>
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className={classes.itemTotal}>
                                                        <span>
                                                            ৳
                                                            {(
                                                                item.total_price ||
                                                                (Number(item.unit_price) || 1) *
                                                                    (Number(item.quantity) || 1)
                                                            ).toFixed(2)}
                                                        </span>
                                                        <div className={classes.buttonWrapper}>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className={classes.removeBtn}
                                                                disabled={isLoading}>
                                                                <IoTrashBinOutline size={20} />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right - Summary */}
                        <div className={classes.cartSummary}>
                            <div className={classes.summaryRow}>
                                <span className={classes.label}>
                                    Subtotal ({medicineLines.length} {medicineLines.length === 1 ? 'item' : 'items'})
                                </span>
                                <span className={classes.value}>৳ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className={classes.summaryRow}>
                                <span className={classes.label}>Discount (8%)</span>
                                <span className={classes.discount}>৳ -{discount.toFixed(2)}</span>
                            </div>
                            <div className={`${classes.summaryRow} ${classes.borderedBottom}`}>
                                <span className={classes.label}>Shipping</span>
                                <span className={classes.value}>৳ {shipping}</span>
                            </div>
                            <div className={`${classes.summaryRow} ${classes.borderedBottom}`}>
                                <span className={classes.totalLabel}>Total (With Vat)</span>
                                <div className={classes.totalGroup}>
                                    <span className={classes.oldTotal}>৳ {subtotal.toFixed(2)}</span>
                                    <span className={classes.totalAmount}>৳ {grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className={`${classes.freeDelivery} ${classes.borderedBottom}`}>
                                <span>Free delivery if you checkout today</span>
                            </div>

                            {stateAuth ? (
                                <button
                                    onClick={handleSubmit}
                                    className={classes.checkoutBtn}
                                    disabled={isLoading || medicineLines.length === 0}>
                                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                                </button>
                            ) : (
                                <div>
                                    <Authentication handleClose={() => setShowModal(false)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
