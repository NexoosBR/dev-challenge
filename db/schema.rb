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

ActiveRecord::Schema.define(version: 2021_03_04_221038) do

  create_table "addresses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "address", null: false
    t.string "neighborhood", null: false
    t.string "city", null: false
    t.integer "fed_unit", default: 0
    t.string "zipcode", null: false
    t.bigint "borrower_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["borrower_id"], name: "index_addresses_on_borrower_id"
  end

  create_table "borrowers", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "company_name", null: false
    t.string "company_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "borrowings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "installment_plan", default: 1, null: false
    t.decimal "interest_rate", precision: 10, null: false
    t.integer "status", default: 0
    t.decimal "amount", precision: 10, null: false
    t.decimal "total", precision: 10, null: false
    t.bigint "borrower_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["borrower_id"], name: "index_borrowings_on_borrower_id"
  end

  create_table "installments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "number", null: false
    t.decimal "amount", precision: 10, null: false
    t.datetime "due_at", null: false
    t.bigint "borrowing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["borrowing_id"], name: "index_installments_on_borrowing_id"
  end

  create_table "phones", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "area_code", null: false
    t.integer "phone_type", default: 0
    t.string "phone_number", null: false
    t.bigint "borrower_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["borrower_id"], name: "index_phones_on_borrower_id"
    t.index ["phone_number"], name: "index_phones_on_phone_number"
  end

  add_foreign_key "addresses", "borrowers"
  add_foreign_key "borrowings", "borrowers"
  add_foreign_key "installments", "borrowings"
  add_foreign_key "phones", "borrowers"
end
