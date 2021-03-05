class LoanSerializer < ActiveModel::Serializer
  attributes :id, :value, :total, :subdivision, :interest, :installments

  def installments
    object.installments.map do |installment|
      InstallmentSerializer.new(installment)
    end
  end
end
