# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_20_131030) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.bigint "client_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_addresses_on_client_id"
  end

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.text "cnpj"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "credits", force: :cascade do |t|
    t.bigint "client_id"
    t.decimal "value", precision: 15, scale: 2
    t.decimal "remain", precision: 15, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_credits_on_client_id"
  end

  create_table "installments", force: :cascade do |t|
    t.bigint "loan_id"
    t.date "payday"
    t.decimal "value", precision: 15, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["loan_id"], name: "index_installments_on_loan_id"
  end

  create_table "loans", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "credit_id"
    t.integer "subdivision"
    t.decimal "interest"
    t.decimal "value", precision: 15, scale: 2
    t.decimal "total", precision: 15, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_loans_on_client_id"
    t.index ["credit_id"], name: "index_loans_on_credit_id"
  end

  create_table "phones", force: :cascade do |t|
    t.bigint "client_id"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["client_id"], name: "index_phones_on_client_id"
  end

  add_foreign_key "addresses", "clients"
  add_foreign_key "credits", "clients"
  add_foreign_key "installments", "loans"
  add_foreign_key "loans", "clients"
  add_foreign_key "loans", "credits"
  add_foreign_key "phones", "clients"
end
