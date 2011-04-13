#!/usr/bin/env ruby

require 'json'
require 'pp'
require 'matrix'

class Birom
  attr_accessor :matrix

  def initialize(stones)
    @matrix = Matrix[ stones ]
    puts @matrix
  end

  def valid?
  end
end

def collision?(birom)

end

def adjeacent?()

end


s = JSON.parse(IO.read(ARGV[0]))

moves = []

s.each do |move|
  b = Birom.new(move)
end
