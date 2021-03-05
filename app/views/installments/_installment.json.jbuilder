json.extract! installment, :id, :installment_value, :due_at, :loan_application_id, :created_at, :updated_at
json.url installment_url(installment, format: :json)
