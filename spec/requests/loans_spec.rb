 require 'rails_helper'

RSpec.describe "/loans", type: :request do
  let!(:company) { create(:company) }
  before { sign_in(company) }

  let!(:loan) { create(:loan, company: company)}

  let(:valid_attributes) { build(:loan, company: company).attributes }

  let(:invalid_attributes) { { value: nil, number_installments: nil } }

  describe "GET /index" do
    it "renders a successful response" do
      Loan.create! valid_attributes
      get loans_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      loan = Loan.create! valid_attributes
      get loan_url(loan)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_loan_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      loan = Loan.create! valid_attributes
      get edit_loan_url(loan)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Loan" do
        expect {
          post loans_url, params: { loan: valid_attributes }
        }.to change(Loan, :count).by(1)
      end

      it "redirects to the created loan" do
        post loans_url, params: { loan: valid_attributes }
        expect(response).to redirect_to(loan_url(Loan.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Loan" do
        expect {
          post loans_url, params: { loan: invalid_attributes }
        }.to change(Loan, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post loans_url, params: { loan: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) { {value: 15000} }

      it "updates the requested loan" do
        loan = Loan.create! valid_attributes
        patch loan_url(loan), params: { loan: new_attributes }
        loan.reload
        expect(loan.value).to eq(15000)
      end

      it "redirects to the loan" do
        loan = Loan.create! valid_attributes
        patch loan_url(loan), params: { loan: new_attributes }
        loan.reload
        expect(response).to redirect_to(loan_url(loan))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        loan = Loan.create! valid_attributes
        patch loan_url(loan), params: { loan: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested loan" do
      loan = Loan.create! valid_attributes
      expect {
        delete loan_url(loan)
      }.to change(Loan, :count).by(-1)
    end

    it "redirects to the loans list" do
      loan = Loan.create! valid_attributes
      delete loan_url(loan)
      expect(response).to redirect_to(loans_url)
    end
  end
end
