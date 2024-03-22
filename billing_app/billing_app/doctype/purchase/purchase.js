// Copyright (c) 2024, Akash and contributors
// For license information, please see license.txt

function calculateTotal(frm) {
    // let totalQuantity = 0;
    // let totalPrice = 0;

    // frm.doc.list_of_items.forEach(function (childRow) {
    //     totalQuantity += childRow.quantity;
    //     totalPrice += childRow.total;
    // });

    // frm.set_value("total_quantity", totalQuantity);
    // frm.refresh_field("total_quantity");

    // frm.set_value("grand_total", totalPrice);
    // frm.refresh_field("grand_total");

    let totalQuantityProduct = 0;
    let totalPriceProduct = 0;
    let totalQuantityService = 0;
    let totalPriceService = 0;

    frm.doc.list_of_items.forEach(function (childRow) {
        if (childRow.type === "Product") {
            totalQuantityProduct += childRow.quantity;
            totalPriceProduct += childRow.total;
        } else if (childRow.type === "Service") {
            totalQuantityService += childRow.quantity;
            totalPriceService += childRow.total;
        }
    });

    frm.set_value("total_products_quantity", totalQuantityProduct);
    frm.refresh_field("total_products_quantity");
    frm.set_value("total_products_price", totalPriceProduct);
    frm.refresh_field("total_products_price");

    frm.set_value("total_services_quantity", totalQuantityService);
    frm.refresh_field("total_services_quantity");
    frm.set_value("total_services_price", totalPriceService);
    frm.refresh_field("total_services_price");

    let totalQuantity = totalQuantityProduct + totalQuantityService;
    frm.set_value("total_quantity", totalQuantity);
    frm.refresh_field("total_quantity");

    let grandTotal = totalPriceProduct + totalPriceService;
    frm.set_value("grand_total", grandTotal);
    frm.refresh_field("grand_total");
}

frappe.ui.form.on("Purchase", {
    refresh(frm) {
        frm.add_custom_button("Add Products", () => {
            let Dialog = new frappe.ui.Dialog({
                title: "Add Item",
                fields: [
                    {
                        label: "Product",
                        fieldname: "product",
                        fieldtype: "Link",
                        options: "Product List",
                        reqd: 1,
                    },
                    {
                        label: "Quantity",
                        fieldname: "quantity",
                        fieldtype: "Int",
                        reqd: 1,
                    },
                ],
                primary_action: function (values) {
                    frappe.db.get_value('Product List', { 'name': values.product }, ['selling_price'], function (data) {
                        if (data && data.selling_price) {
                            let row = frm.add_child("list_of_items", {
                                product_service: values.product,
                                type: "Product",
                                price: data.selling_price,
                                quantity: values.quantity,
                                total: data.selling_price * values.quantity,
                            });

                            frm.refresh_field("list_of_items");
                            Dialog.hide();

                            calculateTotal(frm);
                        }
                    });
                },
            });

            Dialog.show();
        }, __("Add"));

        frm.add_custom_button("Add Services", () => {
            let Dialog = new frappe.ui.Dialog({
                title: "Add Item",
                fields: [
                    {
                        label: "Service",
                        fieldname: "service",
                        fieldtype: "Link",
                        options: "Services List",
                        reqd: 1,
                    },
                    {
                        label: "Quantity",
                        fieldname: "quantity",
                        fieldtype: "Int",
                        reqd: 1,
                    },
                ],
                primary_action: function (values) {
                    frappe.db.get_value('Services List', { 'name': values.service }, ['price'], function (data) {
                        if (data && data.price) {
                            let row = frm.add_child("list_of_items", {
                                product_service: values.service,
                                type: "Service",
                                price: data.price,
                                quantity: values.quantity,
                                total: data.price * values.quantity,
                            });

                            frm.refresh_field("list_of_items");
                            Dialog.hide();

                            calculateTotal(frm);
                        }
                    });
                },
            });

            Dialog.show();
        }, __("Add"));
    },
    validate: function (frm) {
        frm.set_value("date", frappe.datetime.nowdate());
    },
});

frappe.ui.form.on("items sell", {
    list_of_items_remove: function (frm) {
        calculateTotal(frm);
    },
});
