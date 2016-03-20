class TodoSerializer < ActiveModel::Serializer
  attributes :id, :index, :isComplete, :label

  private

  # TODO: automatically convert booleans to is___
  def isComplete
    object.complete?
  end
end
