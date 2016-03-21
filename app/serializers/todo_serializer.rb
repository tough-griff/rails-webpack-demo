class TodoSerializer < ActiveModel::Serializer
  attributes :id, :index, :label

  attribute :isComplete do
    object.complete?
  end
end
