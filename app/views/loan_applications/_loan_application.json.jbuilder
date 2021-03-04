json.extract! loan_application, :id, :number_installments, :interest_rate, :status, :loan_applicant_id, :created_at, :updated_at
json.url loan_application_url(loan_application, format: :json)
