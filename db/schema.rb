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

ActiveRecord::Schema.define(version: 2021_03_04_202352) do

  create_table "addresses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "address", null: false
    t.string "neighborhood", null: false
    t.string "city", null: false
    t.integer "fed_unit", default: 0
    t.string "zipcode", null: false
    t.bigint "loan_applicant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["loan_applicant_id"], name: "index_addresses_on_loan_applicant_id"
  end

  create_table "loan_applicants", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "company_name", null: false
    t.string "company_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "telephones", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "area_code", null: false
    t.integer "phone_type", default: 0
    t.string "phone_number", null: false
    t.bigint "loan_applicant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["loan_applicant_id"], name: "index_telephones_on_loan_applicant_id"
    t.index ["phone_number"], name: "index_telephones_on_phone_number"
  end

  add_foreign_key "addresses", "loan_applicants"
  add_foreign_key "telephones", "loan_applicants"
end
