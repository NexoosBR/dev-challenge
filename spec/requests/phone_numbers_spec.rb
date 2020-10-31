 require 'rails_helper'

RSpec.describe "/phone_numbers", type: :request do
  let!(:company) { create(:company) }
  before { sign_in(company) }

  let!(:phone_number) { create(:phone_number, company: company)}

  let(:valid_attributes) { build(:phone_number, company: company).attributes }

  let(:invalid_attributes) { { number: nil } }

  describe "GET /index" do
    it "renders a successful response" do
      PhoneNumber.create! valid_attributes
      get phone_numbers_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      phone_number = PhoneNumber.create! valid_attributes
      get phone_number_url(phone_number)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_phone_number_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      phone_number = PhoneNumber.create! valid_attributes
      get edit_phone_number_url(phone_number)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new PhoneNumber" do
        expect {
          post phone_numbers_url, params: { phone_number: valid_attributes }
        }.to change(PhoneNumber, :count).by(1)
      end

      it "redirects to the created phone_number" do
        post phone_numbers_url, params: { phone_number: valid_attributes }
        expect(response).to redirect_to(phone_number_url(PhoneNumber.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new PhoneNumber" do
        expect {
          post phone_numbers_url, params: { phone_number: invalid_attributes }
        }.to change(PhoneNumber, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post phone_numbers_url, params: { phone_number: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) { { number: '123456789' } }

      it "updates the requested phone_number" do
        phone_number = PhoneNumber.create! valid_attributes
        patch phone_number_url(phone_number), params: { phone_number: new_attributes }
        phone_number.reload
        expect(phone_number.number).to eq('123456789')
      end

      it "redirects to the phone_number" do
        phone_number = PhoneNumber.create! valid_attributes
        patch phone_number_url(phone_number), params: { phone_number: new_attributes }
        phone_number.reload
        expect(response).to redirect_to(phone_number_url(phone_number))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        phone_number = PhoneNumber.create! valid_attributes
        patch phone_number_url(phone_number), params: { phone_number: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested phone_number" do
      phone_number = PhoneNumber.create! valid_attributes
      expect {
        delete phone_number_url(phone_number)
      }.to change(PhoneNumber, :count).by(-1)
    end

    it "redirects to the phone_numbers list" do
      phone_number = PhoneNumber.create! valid_attributes
      delete phone_number_url(phone_number)
      expect(response).to redirect_to(phone_numbers_url)
    end
  end
end
