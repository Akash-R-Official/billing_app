# In your Python file (e.g., your_page_name.py)
import frappe
from datetime import datetime

@frappe.whitelist()
def get_total_quantity():
    total_quantity = frappe.db.sql("""
         SELECT SUM(total_quantity)
         FROM `tabPurchase`
         WHERE DATE(creation) = CURDATE()
     """)  

    return total_quantity


@frappe.whitelist()
def get_total_price():
    total_price = frappe.db.sql("""
         SELECT SUM(grand_total)
         FROM `tabPurchase`
         WHERE DATE(creation) = CURDATE()
     """)  

    return total_price

@frappe.whitelist()
def get_product_quantity():
    product_quantity = frappe.db.sql("""
         SELECT SUM(total_products_quantity)
         FROM `tabPurchase`
         WHERE DATE(creation) = CURDATE()
     """)  

    return product_quantity

@frappe.whitelist()
def get_product_price():
    product_price = frappe.db.sql("""
         SELECT SUM(total_products_price)
         FROM `tabPurchase`
         WHERE DATE(creation) = CURDATE()
     """)  

    return product_price

@frappe.whitelist()
def get_service_quantity():
    service_quantity = frappe.db.sql("""
         SELECT SUM(total_services_quantity)
         FROM `tabPurchase`
         WHERE DATE(creation) = CURDATE()
     """)  

    return service_quantity

@frappe.whitelist()
def get_service_price():
    service_price = frappe.db.sql("""
         SELECT SUM(total_services_price)
         FROM `tabPurchase`
         WHERE DATE(creation) = CURDATE()
     """)  

    return service_price

@frappe.whitelist()
def get_walk_in_count():
    walk_in_count = frappe.db.sql("""
        SELECT COUNT(*)
        FROM `tabPurchase`
        WHERE customer_type = 'Walk-in'
        AND DATE(creation) = CURDATE()
    """)

    return walk_in_count

@frappe.whitelist()
def get_appointments():
    appointments = frappe.db.sql("""
        SELECT COUNT(*)
        FROM `tabPurchase`
        WHERE customer_type = 'Appointment'
        AND DATE(creation) = CURDATE()
    """)

    return appointments

@frappe.whitelist()
def get_cash_payment():
    cash_payment = frappe.db.sql("""
        SELECT COUNT(*)
        FROM `tabPurchase`
        WHERE payment_method = 'Cash'
        AND DATE(creation) = CURDATE()
    """)

    return cash_payment

@frappe.whitelist()
def get_card_payment():
    card_payment = frappe.db.sql("""
        SELECT COUNT(*)
        FROM `tabPurchase`
        WHERE payment_method = 'Card'
        AND DATE(creation) = CURDATE()
    """)

    return card_payment

@frappe.whitelist()
def get_other_payment():
    other_payment = frappe.db.sql("""
        SELECT COUNT(*)
        FROM `tabPurchase`
        WHERE payment_method = 'Other'
        AND DATE(creation) = CURDATE()
    """)

    return other_payment

@frappe.whitelist()
def get_weekly_branch_data():   
    branch_data = frappe.db.sql("""
        SELECT branch_name, SUM(grand_total) as total
        FROM `tabPurchase`
        WHERE WEEK(creation) = WEEK(NOW()) AND YEAR(creation) = YEAR(NOW())
        GROUP BY branch_name
    """, as_dict=True)    
    
    return branch_data
