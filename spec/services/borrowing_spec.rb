require 'rails_helper'

RSpec.describe BorrowingService, type: :model do
  it "Should return the value of the installments" do
    borrowing1 = build(:borrowing, 
        installment_plan: 12,
        interest_rate: 1.5,
        amount: 100000
       )
    pmt = BorrowingService.new(borrowing1).call
    expect(pmt).to eql(9167.999290622945)
  end

  it "Should not be valid. amount is nil" do
    borrowing1 = build(:borrowing, amount: nil)
    expect { BorrowingService.new(borrowing1).call }.to raise_error("The amount is not valid")
  end

  it "Should not be valid. amount is less than 1" do
    borrowing1 = build(:borrowing, amount: 0)
    expect { BorrowingService.new(borrowing1).call }.to raise_error("The amount is not valid")
  end

  it "Should not be valid. installment_plan is nil" do
    borrowing1 = build(:borrowing, installment_plan: nil)
    expect { BorrowingService.new(borrowing1).call }.to raise_error("The installment plan is not valid")
  end

  it "Should not be valid. installment_plan is less than 1" do
    borrowing1 = build(:borrowing, installment_plan: 0)
    expect { BorrowingService.new(borrowing1).call }.to raise_error("The installment plan is not valid")
  end

  it "Should not be valid. interest_rate is nil" do
    borrowing1 = build(:borrowing, interest_rate: nil)
    expect { BorrowingService.new(borrowing1).call }.to raise_error("The interest rate is not valid")
  end

  it "Should not be valid. interest_rate is less than 0" do
    borrowing1 = build(:borrowing, interest_rate: -1)
    expect { BorrowingService.new(borrowing1).call }.to raise_error("The interest rate is not valid")
  end
end