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

ActiveRecord::Schema.define(version: 2021_03_06_212148) do

  create_table "addresses", force: :cascade do |t|
    t.string "street"
    t.string "number"
    t.string "zipcode"
    t.string "complement"
    t.string "city"
    t.string "state"
    t.string "country"
    t.integer "applicant_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "applicants", force: :cascade do |t|
    t.string "company_name"
    t.string "cnpj"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "installments", force: :cascade do |t|
    t.date "billing_date"
    t.decimal "value", precision: 8, scale: 2
    t.integer "loan_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "loan_requests", force: :cascade do |t|
    t.decimal "value", precision: 8, scale: 2
    t.integer "applicant_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "loans", force: :cascade do |t|
    t.decimal "value", precision: 8, scale: 2
    t.integer "installment_count"
    t.decimal "interest", precision: 4, scale: 3
    t.integer "loan_request_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "phones", force: :cascade do |t|
    t.string "number"
    t.integer "applicant_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
