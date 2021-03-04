json.extract! telephone, :id, :area_code, :phone_type, :phone_number, :loan_applicant_id, :created_at, :updated_at
json.url telephone_url(telephone, format: :json)
