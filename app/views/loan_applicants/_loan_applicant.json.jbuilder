json.extract! loan_applicant, :id, :company_name, :company_number, :created_at, :updated_at
json.url loan_applicant_url(loan_applicant, format: :json)
