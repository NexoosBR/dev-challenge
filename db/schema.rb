# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_21_163258) do

  create_table "addresses", force: :cascade do |t|
    t.integer "company_id", null: false
    t.string "street"
    t.integer "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_addresses_on_company_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "cnpj"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "credit_requests", force: :cascade do |t|
    t.integer "company_id", null: false
    t.float "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "periods"
    t.float "monthly_fee"
    t.integer "status"
    t.float "monthly_value"
    t.index ["company_id"], name: "index_credit_requests_on_company_id"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "credit_request_id", null: false
    t.float "amount"
    t.date "due_date"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["credit_request_id"], name: "index_payments_on_credit_request_id"
  end

  create_table "phones", force: :cascade do |t|
    t.integer "company_id", null: false
    t.string "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_phones_on_company_id"
  end

  add_foreign_key "addresses", "companies"
  add_foreign_key "credit_requests", "companies"
  add_foreign_key "payments", "credit_requests"
  add_foreign_key "phones", "companies"
end
